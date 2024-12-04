"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How can students pay their fees online?",
    answer:
      "Students can log in to the student portal using their credentials, navigate to the 'Payments' section, and follow the steps to pay their fees via net banking, UPI, or debit/credit card.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept payments through multiple methods including net banking, UPI, credit cards, debit cards, and digital wallets.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions to reset it using your registered email or phone number.",
  },
  {
    question: "Is the portal secure?",
    answer:
      "Yes, our portal is fully secure and complies with all required data protection regulations. All transactions and personal data are encrypted for your safety.",
  },
  {
    question: "Who do I contact if I face issues with the portal?",
    answer:
      "If you encounter any issues, you can reach out to the accounts department via the 'Contact Us' section or email us directly at support@iiitl.ac.in.",
  },
  {
    question: "Can I download transaction receipts after making payments?",
    answer:
      "Yes, once your payment is processed, you will receive a confirmation and a downloadable receipt in your account under the 'Payment History' section.",
  },
  {
    question: "What is the deadline for student fee payments?",
    answer:
      "The fee payment deadline is communicated at the beginning of each semester. Make sure to check the announcements section for the latest updates.",
  },
];

const Faq = () => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-9xl py-10">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-3xl font-bold leading-10 tracking-wide text-gray-900 text-center">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-4">
                {({ open }: { open: boolean }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusIcon aria-hidden="true" className="h-6 w-6" />
                          ) : (
                            <PlusIcon aria-hidden="true" className="h-6 w-6" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Faq;
