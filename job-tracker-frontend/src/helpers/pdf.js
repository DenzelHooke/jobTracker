export const renderPDF = async ({ url, canvasID }) => {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    print(url);

    // Fetch PDF
    const pdf = await loadingTask.promise;

    // Fetch first page
    const page = await pdf.getPage(1);
    const scale = 1;
    const viewport = page.getViewport({ scale });

    // Support HiDPI-screens
    const outputScale = window.devicePixelRatio || 1;

    // Prepare canvas using PDF page dimensions
    const canvas = document.getElementById(canvasID);
    const context = canvas.getContext('2d');

    // Set dimensions of canvas
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + 'px';

    const transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    const renderContext = {
      canvasContext: context,
      transform: transform,
      viewport: viewport,
    };

    page.render(renderContext);
  } catch {
    return null;
  }
};
