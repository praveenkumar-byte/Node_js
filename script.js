

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculatorForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const num1 = formData.get('num1');
        const num2 = formData.get('num2');
        const operation = formData.get('operation');

        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ num1, num2, operation })
        });

        const data = await response.json();
        console.log(data)
        document.getElementById('result').innerText = `Result: ${data.result}`;
    });
});
