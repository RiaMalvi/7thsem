import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";

const features = [
  {
    name: 'Unlimited inboxes',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
    href: '#',
    icon: MdOutlineForwardToInbox,
  },
  {
    name: 'Manage team members',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
    href: '#',
    icon: FaUserAlt,
  },
  {
    name: 'Spam report',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
    href: '#',
    icon: IoTrash,
  },
  {
    name: 'Customer connections',
    description:
      'Deserunt corrupti praesentium quo vel cupiditate est occaecati ad. Aperiam libero modi similique iure praesentium facilis quo cumque quibusdam.',
    icon: FaHeart,
  },
]

// export default function Example() {
//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:mx-0">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Stay on top of customer support
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
//             accusamus quisquam.
//           </p>
//         </div>
//         <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
//           <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
//             {features.map((feature) => (
//               <div key={feature.name} className="flex flex-col">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
//                     <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
//                   </div>
//                   {feature.name}
//                 </dt>
//                 <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
//                   <p className="flex-auto">{feature.description}</p>
//                   <p className="mt-6">
//                     <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
//                       Learn more <span aria-hidden="true">→</span>
//                     </a>
//                   </p>
//                 </dd>
//               </div>
//             ))}
//           </dl>
//         </div>
//       </div>
//     </div>
//   )
// }


import React from 'react'

const Features = () => {
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Stay on top of customer support
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
