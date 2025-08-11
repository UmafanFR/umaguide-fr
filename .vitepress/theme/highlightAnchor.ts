// Function to wait element to be created
function waitForElementById(id: string, maxRetries = 10, delay = 100): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const tryFind = () => {
      const el = document.getElementById(id);
      if (el) return resolve(el);
      if (++attempts >= maxRetries) return reject(new Error(`Element #${id} not found.`));
      setTimeout(tryFind, delay);
    };
    tryFind();
  });
}

function highlightAnchor(rawTo: string | { fullPath?: string }) {
  const to = typeof rawTo === 'string' ? rawTo : rawTo?.fullPath || '';
  const hashIndex = to.indexOf('#');
  if (hashIndex === -1) return;

  const id = decodeURIComponent(to.slice(hashIndex + 1));
  if (!id) return;

  waitForElementById(id)
    .then(heading => {
      document.querySelectorAll('.anchor-highlight').forEach(el => {
        el.classList.remove('anchor-highlight');
      });

      heading.classList.add('anchor-highlight');
    })
    .catch(err => {
      console.warn(err.message);
    });
}

export default highlightAnchor;
