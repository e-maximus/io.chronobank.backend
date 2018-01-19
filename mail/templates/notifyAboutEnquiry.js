module.exports = ({ name, email, phone, enquiryType, message, createdAt }) => ({
  subject: 'New Enquiry',
  content: `
    <html>
      <body>
        <p><b>New Enquiry</b></p>
        <table border="0" width="400">
          <tr>
            <td>Topic:</td>
            <td>${enquiryType != null ? enquiryType : 'N/A'}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>${createdAt != null ? createdAt : 'N/A'}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>${name != null ? name : 'N/A'}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>${email != null ? email : 'N/A'}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>${phone != null ? phone : 'N/A'}</td>
          </tr>
          <tr>
            <td>Message:</td>
            <td>${message != null ? message : 'N/A'}</td>
          </tr>
        </table>
      </body>
    </html>
  `
})
