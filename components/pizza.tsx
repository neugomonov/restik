import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "../vendor_mods/three/examples/jsm/controls/OrbitControls.js";
import { loadGLTFModel } from "../lib/model";
import { PizzaSpinner, PizzaContainer } from "./pizza-loader";

function easeOutCirc(x: number) {
	return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const Pizza = () => {
	const refContainer = useRef<HTMLDivElement>();
	const [loading, setLoading] = useState(true);
	const [renderer, setRenderer] = useState<any>();
	const [_camera, setCamera] = useState();
	const [target] = useState(new THREE.Vector3(0, 0.25, 0));
	const [initialCameraPosition] = useState(
		new THREE.Vector3(
			20 * Math.sin(0.2 * Math.PI),
			10,
			20 * Math.cos(0.2 * Math.PI)
		)
	);
	const [scene] = useState(new THREE.Scene());
	const [_controls, setControls] = useState();

	const handleWindowResize = useCallback(() => {
		const { current: container } = refContainer;
		if (container && renderer) {
			const scW = container.clientWidth;
			const scH = container.clientHeight;

			renderer.setSize(scW, scH);
		}
	}, [renderer]);

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		const { current: container } = refContainer;
		if (container && !renderer) {
			const scW = container.clientWidth;
			const scH = container.clientHeight;

			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(scW, scH);
			renderer.outputEncoding = THREE.sRGBEncoding;
			container.appendChild(renderer.domElement);
			setRenderer(renderer);

			const scale = scH * 0.005 + 4.8;
			const camera = new THREE.OrthographicCamera(
				-1.3,
				1.3,
				1.3,
				-1.3,
				0.01,
				50000
			);
			camera.position.copy(initialCameraPosition);
			camera.lookAt(target);
			// @ts-expect-error
			setCamera(camera);

			const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
			scene.add(ambientLight);

			const controls = new OrbitControls(camera, renderer.domElement);
			controls.autoRotate = true;
			controls.target = target;
			// @ts-expect-error
			setControls(controls);

			loadGLTFModel(scene, "/pizza.glb", {
				receiveShadow: false,
				castShadow: false,
			}).then(() => {
				animate();
				setLoading(false);
			});
			// @ts-expect-error
			let req = null;
			let frame = 0;
			const animate = () => {
				req = requestAnimationFrame(animate);

				frame = frame <= 100 ? frame + 1 : frame;

				if (frame <= 100) {
					const p = initialCameraPosition;
					const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

					camera.position.y = 10;
					camera.position.x =
						p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
					camera.position.z =
						p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
					camera.lookAt(target);
				} else {
					controls.update();
				}

				renderer.render(scene, camera);
			};

			return () => {
				console.log("pizza unmounted");
				// @ts-expect-error
				cancelAnimationFrame(req);
				renderer.dispose();
			};
		}
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize, false);
		return () => {
			window.removeEventListener("resize", handleWindowResize, false);
		};
	}, [renderer, handleWindowResize]);

	return (
		// @ts-expect-error
		<PizzaContainer ref={refContainer}>
			{loading && <PizzaSpinner />}
		</PizzaContainer>
	);
};

export default Pizza;