const toggle = document.createElement('button');
toggle.innerText = 'Toggle Dark Mode';
document.body.append(toggle);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

console.log("hello, world?!")