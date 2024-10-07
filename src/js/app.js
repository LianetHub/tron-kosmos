"use strict";


import * as devFunctions from './modules/functions.js';

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

document.addEventListener('DOMContentLoaded', () => {

    devFunctions.OS();
    devFunctions.isWebp();


    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;
        const header = document.querySelector('.header');

        if (target.closest('.icon-menu')) {
            header.classList.toggle('open-menu');
        }

        if (header.classList.contains('open-menu') && !target.closest('.menu')) {
            header.classList.remove('open-menu');
        }
    });


    const stars = document.querySelectorAll('.main__light');

    stars.forEach((star) => {

        star.style.position = 'absolute';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 10 + 50}px`;


        gsap.to(star, {
            opacity: Math.random(),
            repeat: -1,
            yoyo: true,
            duration: Math.random() * 2 + 1,
            ease: 'power2.inOut'
        });
    });


    gsap.timeline({
        ease: 'power2.out',
        duration: 1
    })
        .from('.main__title', {
            opacity: 0,
            y: 50,
            delay: 0.25
        })
        .from('.main__astro', {
            opacity: 0,
        })
        .from('.main__sidebar', {
            opacity: 0,
            y: 50
        },)
        .from('.main__footer', {
            opacity: 0,
            y: 20,
        });



    gsap.registerPlugin(MotionPathPlugin);

    const circles = gsap.utils.toArray(".circle-block");

    circles.forEach((circle, index) => {

        const startPosition = index * (1 / circles.length);
        const endPosition = startPosition + 1;
        const totalDuration = 50;

        gsap.to(circle, {
            duration: totalDuration,
            repeat: -1,
            motionPath: {
                path: "#orbit",
                align: "#orbit",
                start: startPosition,
                end: endPosition,
                alignOrigin: [0.5, 0.5],
            },
            ease: "none",
            onUpdate: function () {

                const time = gsap.getProperty(this, "time");
                const progress = time / totalDuration;

                const isInSecondHalf = (progress + startPosition) % 1 >= 0.5;

                if (isInSecondHalf) {
                    circle.parentNode.prepend(circle);
                } else {
                    circle.parentNode.append(circle);
                }
            }
        });
    });










})




