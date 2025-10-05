import * as THREE from "three";

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

class Sketch {
  constructor(
    options = {
      dom: null,
      image: { imageUrl: null, height: null, width: null },
      setting: { relaxation: 0.9, strength: 0.13, mouse: 0.5 },
      pixel: { countX: 50, countY: 25 },
    }
  ) {
    this.dom = options.dom;
    this.imageUrl = options.image.imageUrl;
    this.WIDTH = this.dom.offsetWidth;
    this.HEIGHT = this.dom.offsetHeight;
    this.vertexShader = options.shaders.vertex;
    this.fragmentShader = options.shaders.fragment;
    this.imageAspectRatio = options.image.height / options.image.width;
    this.texture = {
      dataTexture: null,
      width: options.pixel.countX,
      height: options.pixel.countY,
    };
    this.relaxation = options.setting.relaxation;
    this.mouse_ = options.setting.mouse;
    this.strength = options.setting.strength;
    this.uniforms = {
      uTexture: { value: new THREE.TextureLoader().load(this.imageUrl) },
      uDataTexture: { value: null },
      uResolution: { value: new THREE.Vector4() },
    };
    this.mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      velX: 0,
      velY: 0,
      gridX: 0,
      gridY: 0,
      isOver: false,
    };

    // Store event handlers
    this.mousemoveHandler = (e) => {
      this.mouse.x = e.offsetX / this.WIDTH;
      this.mouse.y = e.offsetY / this.HEIGHT;

      this.mouse.velX = this.mouse.x - this.mouse.prevX;
      this.mouse.velY = this.mouse.y - this.mouse.prevY;

      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;

      this.mouse.gridX = Math.round(
        e.offsetX / (this.WIDTH / this.texture.width)
      );
      this.mouse.gridY = Math.round(
        e.offsetY / (this.HEIGHT / this.texture.height)
      );
    };

    this.mouseenterHandler = () => {
      this.mouse.isOver = true;
    };

    this.mouseleaveHandler = () => {
      this.mouse.isOver = false;
    };

    this.resizeHandler = this.resize.bind(this);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      1 / -2,
      1 / 2,
      1 / 2,
      1 / -2,
      -1000,
      1000
    );
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);

    // Calculate image sizing
    this.updateResolution();

    this.activateMouseEvent();
    this.addObject();
    this.generateDataTexture();
    this.render();
    this.animate();
    this.activateResizeEvent();
  }

  updateResolution() {
    let a1, a2;
    if (this.HEIGHT / this.WIDTH > this.imageAspectRatio) {
      a1 = (this.WIDTH / this.HEIGHT) * this.imageAspectRatio;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.HEIGHT / this.WIDTH / this.imageAspectRatio;
    }

    this.uniforms.uResolution.value.x = this.WIDTH;
    this.uniforms.uResolution.value.y = this.HEIGHT;
    this.uniforms.uResolution.value.z = a1;
    this.uniforms.uResolution.value.w = a2;
  }

  resize() {
    this.WIDTH = this.dom.offsetWidth;
    this.HEIGHT = this.dom.offsetHeight;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.updateResolution();
  }

  activateResizeEvent() {
    window.addEventListener("resize", this.resizeHandler);
  }

  addObject() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.plane);
  }

  generateDataTexture() {
    const size = this.texture.width * this.texture.height;
    const data = new Float32Array(4 * size);

    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      data[stride] = 0; // Changed from random to 0
      data[stride + 1] = 0; // Changed from random to 0
      data[stride + 2] = 0;
      data[stride + 3] = 1;
    }

    this.texture.dataTexture = new THREE.DataTexture(
      data,
      this.texture.width,
      this.texture.height,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.texture.dataTexture.flipY = true;
    this.texture.dataTexture.needsUpdate = true;
    this.uniforms.uDataTexture.value = this.texture.dataTexture;
  }

  activateMouseEvent() {
    this.dom.addEventListener("mousemove", this.mousemoveHandler);
    this.dom.addEventListener("mouseenter", this.mouseenterHandler);
    this.dom.addEventListener("mouseleave", this.mouseleaveHandler);
  }

  updateDataTexture() {
    let data = this.texture.dataTexture.image.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= this.relaxation;
      data[i + 1] *= this.relaxation;
    }

    let mouseX = this.mouse.x * this.texture.width,
      mouseY = this.mouse.y * this.texture.height;
    let aspect = this.WIDTH / this.HEIGHT;
    let distance = (x1, y1, x2, y2) => {
      return (x2 - x1) ** 2 / aspect + (y2 - y1) ** 2;
    };

    let threshold_distance = this.texture.width * this.mouse_;

    if (this.mouse.isOver) {
      for (let i = 0; i < this.texture.height; i++) {
        for (let j = 0; j < this.texture.width; j++) {
          const d = Math.sqrt(distance(mouseX, mouseY, j, i));
          if (d < threshold_distance) {
            let power = threshold_distance / d;
            power = clamp(power, 0, 10);
            let loc = 4 * (parseInt(i * this.texture.width) + j);
            data[parseInt(loc)] +=
              this.strength * 100 * this.mouse.velX * power;
            data[parseInt(loc) + 1] -=
              this.strength * 100 * this.mouse.velY * power;
          }
        }
      }
    }

    this.mouse.velX *= this.relaxation;
    this.mouse.velY *= this.relaxation;
    this.texture.dataTexture.needsUpdate = true;
  }

  dispose() {
    // Cancel animation frame
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // Remove event listeners
    this.dom.removeEventListener("mousemove", this.mousemoveHandler);
    this.dom.removeEventListener("mouseenter", this.mouseenterHandler);
    this.dom.removeEventListener("mouseleave", this.mouseleaveHandler);
    window.removeEventListener("resize", this.resizeHandler);

    // Dispose Three.js resources
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
    if (this.texture.dataTexture) this.texture.dataTexture.dispose();
    if (this.uniforms.uTexture.value) this.uniforms.uTexture.value.dispose();

    // Dispose and remove renderer
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentNode === this.dom) {
        this.dom.removeChild(this.renderer.domElement);
      }
    }
  }

  render() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.physicallyCorrectLights = true;
    this.dom.appendChild(this.renderer.domElement);
  }

  animate() {
    this.updateDataTexture();
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

export default Sketch;
