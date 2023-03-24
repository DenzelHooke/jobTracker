export function generateFormData({
  company,
  email,
  address,
  jobStatus,
  resumePDF,
}) {
  const formData = new FormData();
  formData.append('resumePDF', resumePDF);
  formData.append('company', company);
  formData.append('company', email);
  formData.append('address', address);
  formData.append('jobStatus', jobStatus);

  return formData;
}
