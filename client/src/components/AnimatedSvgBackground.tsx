import React, { useEffect } from "react";
import { gsap } from "gsap";

const AnimatedSvgBackground = () => {
  useEffect(() => {
    const stage = document.querySelector("svg");
    let xPos = 0;

    // Use simple hex colors to avoid potential issues
    const colors = [
        "#020617", // Original Dark Blue/Black
        "#040a1d", // Lighter Dark Blue
        "#060d23", // More Lighter Dark Blue
        "#081029", // Even Lighter Dark Blue
        "#0a132f", // Lightest Dark Blue
        "#dc2626", // Original Red
        "#e03b3b", // Slightly Lighter Red
        "#e55050", // Lighter Red
        "#e96565", // Even Lighter Red
        "#ed7a7a", // Lightest Red
      ];
  

    for (let i = 0; i < 45; i++) {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const width = gsap.utils.random(5, 32, 1);

      gsap.set(p, {
        x: xPos + width / 2,
        y: 50,
        attr: {
          d: "M0,0 0,0",
          stroke: colors[gsap.utils.random(0, 5, 1)], // Use these simple hex colors
          "stroke-width": width,
        },
      });
      stage.append(p);
      xPos += width + 1.5;
    }

    const tl = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
    });

    tl.to(stage, {
      attr: {
        viewBox: () => "random(400,600,1)" + " 0 500 100",
      },
      ease: "power1.inOut",
      yoyoEase: "power4.inOut",
      repeat: 1,
      repeatDelay: 0.5,
      duration: 1.5,
    }, 0)
      .to("path", {
        ease: "back.out(4)",
        yoyoEase: "power3.in",
        stagger: {
          amount: 1.75,
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.15,
        },
        attr: {
          d: () => {
            const n = gsap.utils.random(1, 50, 1);
            return "M0,-" + n + " 0," + n;
          },
        },
      }, 0);
  }, []);

  return (
    <svg
      viewBox="-250 0 500 100"
      strokeLinecap="round"
      style={{
        position: "absolute",
        top: 0,
        right: 0, 
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default AnimatedSvgBackground;
