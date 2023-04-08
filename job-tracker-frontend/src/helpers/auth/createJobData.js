export function generateFormData({
  company,
  email,
  position,
  jobStatus,
  resumePDF,
}) {
  const formData = new FormData();
  formData.append('resume', resumePDF);
  formData.append('company', company);
  formData.append('email', email);
  formData.append('position', position);
  formData.append('jobStatus', JSON.stringify(jobStatus));

  return formData;
}

const serializeFile = (file) => {
  return JSON.stringify(file);
};
