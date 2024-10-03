import React from 'react'

const Contact = () => {
  return (
    <div className="bg-white p-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Contact the Accounts Department</h2>
          <p className="mt-6 text-md leading-8 text-gray-600">
            If you have any questions or need assistance with fee payments, salary access, or the admin portal, feel free to reach out to the relevant department. We are here to assist you with any financial queries or concerns you may have.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Student Accounts</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600 text-sm">
              <p>Accounts Office - Student Section</p>
              <p>Indian Institute of Information Technology, Lucknow</p>
              <p>Email: student.accounts@iiitl.ac.in</p>
              <p>Phone: +91-12345-67890</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Faculty Payroll</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600 text-sm">
              <p>Accounts Office - Faculty Section</p>
              <p>Indian Institute of Information Technology, Lucknow</p>
              <p>Email: faculty.payroll@iiitl.ac.in</p>
              <p>Phone: +91-98765-43210</p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">Admin Queries</h3>
            <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600 text-sm">
              <p>Admin Office - Accounts Department</p>
              <p>Indian Institute of Information Technology, Lucknow</p>
              <p>Email: admin.accounts@iiitl.ac.in</p>
              <p>Phone: +91-55555-11111</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
