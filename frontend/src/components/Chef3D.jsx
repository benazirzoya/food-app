import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { AnimationMixer } from "three";

export default function Chef3D() {

  const chefRef = useRef();

  // Load FBX model
  const fbx = useLoader(FBXLoader, "/models/chef.fbx");

  const mixer = useRef();

  useEffect(() => {

    // Play animation if available
    if (fbx.animations.length > 0) {

      mixer.current = new AnimationMixer(fbx);

      const action = mixer.current.clipAction(
        fbx.animations[0]
      );

      action.play();
    }

  }, [fbx]);

  // Animate every frame
  useFrame((state, delta) => {

    // Update animation
    mixer.current?.update(delta);

    // Move chef left to right
    if (chefRef.current) {

      chefRef.current.position.x += 0.01;

      // Reset position
      if (chefRef.current.position.x > 3) {
        chefRef.current.position.x = -3;
      }
    }
  });

  return (
    <primitive
      ref={chefRef}
      object={fbx}
      scale={0.01}
      position={[-3, -1, 0]}
    />
  );
}