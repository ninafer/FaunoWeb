const form = document.querySelector("#my-form");
const url = "https://formspree.io/f/xaykrbgd";

async function accionSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch ( url, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                position: 'center',
                iconHtml: '<i class="bi bi-envelope-heart"></i>',
                title: 'Mensaje enviado con exito',
                showConfirmButton: false,
                timer: 1500
            });
            form.reset()
        }
    })
}
form.addEventListener("submit", accionSubmit);
