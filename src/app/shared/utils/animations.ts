import {
    trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';

//   export const slideInAnimation =
//   trigger('routeAnimations', [
//     transition('* <=> *', [
//       // Set a default  style for enter and leave
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           left: 0,
//           width: '100%',
//           opacity: 0,
//           transform: 'scale(0) translateY(100%)',
//         }),
//       ]),
//       // Animate the new page in
//       query(':enter', [
//         animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
//       ])
//     ]),
// ])
//   export const slideInAnimation =
//   trigger('routeAnimations', [
//     transition('HomePage <=> LoginPage', [
//         style({ position: 'relative' }),
//         query(':enter, :leave', [
//           style({
//             position: 'absolute',
//             top: 0,
//             left: 0,
//           })
//         ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('300ms ease-out', style({ left: '100%' }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ]),
//   ]);

//export const fadeAnimation = trigger('routeAnimations', [
//     // The '* => *' will trigger the animation to change between any two states
//     transition('homePage => loginPage', [
//       // The query function has three params.
//       // First is the event, so this will apply on entering or when the element is added to the DOM.
//       // Second is a list of styles or animations to apply.
//       // Third we add a config object with optional set to true, this is to signal
//       // angular that the animation may not apply as it may or may not be in the DOM.
//       query(':enter', [style({ opacity: 0 })], { optional: true }),
//       query(
//         ':leave',
//         // here we apply a style and use the animate function to apply the style over 0.3 seconds
//         [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
//         { optional: true }
//       ),
//       query(
//         ':enter',
//         [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
//         { optional: true }
//       )
//     ])
//   ]);

export const slideInAnimation =
 trigger('routeAnimations', [
  transition('* => loginPage', [
   style({ position: 'relative' }),
   query(':enter, :leave', [
    style({
     position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     backgroundColor: 'pink',
     color: 'red'
    })
   ]),
   query(':enter', [
    style({ left: '-100%'})
   ]),
   query(':leave', animateChild()),
   group([
    query(':leave', [
     animate('5000ms ease-out', style({ left: '100%'}))
    ]),
    query(':enter', [
     animate('5000ms ease-out', style({ left: '0%'}))
    ])
   ]),
   query(':enter', animateChild()),
  ])
 ]);