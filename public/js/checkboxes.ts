document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((checkbox: HTMLInputElement) => {
    checkbox.addEventListener('click', () => {
        const finishButton = document.getElementById('finish') as HTMLButtonElement;
        finishButton.disabled = !Array.from(document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).every(checkbox => checkbox.checked);
    });
 });
 
 document.getElementById('finish')?.addEventListener('click', () => {
    const checkboxesElement = document.getElementById('checkboxes') as HTMLElement;
    const icrazeElement = document.getElementById('icraze') as HTMLElement;
    checkboxesElement.style.display = 'none';
    icrazeElement.style.display = 'block';
 });
 