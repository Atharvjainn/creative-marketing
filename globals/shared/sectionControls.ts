import type { Field } from 'payload';

export const sectionControlFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        label: 'Show Section on Live Website',
        admin: {
          width: '50%',
          description: 'Toggle OFF to hide this section from the website',
        },
      },
      {
        name: 'animationDirection',
        type: 'select',
        defaultValue: 'up',
        label: 'Entrance Animation Style',
        options: [
          { label: 'Slide Up (Standard)', value: 'up' },
          { label: 'Slide Down', value: 'down' },
          { label: 'Slide from Left', value: 'left' },
          { label: 'Slide from Right', value: 'right' },
          { label: 'Smooth Zoom In', value: 'zoom' },
          { label: 'No Animation', value: 'none' },
        ],
        admin: {
          width: '50%',
          description: 'Choose how this section animates into view on scroll',
        },
      },
    ],
  },
];
