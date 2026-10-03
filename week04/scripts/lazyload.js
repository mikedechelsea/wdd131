const lastModifiedSpan = document.getElementById('last-modified');
lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
