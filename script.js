const ticketForm = document.getElementById("ticketForm");
const ticketsContainer = document.getElementById("ticketsContainer");

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function saveTickets() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

function renderTickets() {

    ticketsContainer.innerHTML = "";

    if (tickets.length === 0) {
        ticketsContainer.innerHTML = `
            <p>Nenhum chamado cadastrado.</p>
        `;
        return;
    }

    tickets.forEach((ticket) => {

        const card = document.createElement("div");
        card.classList.add("ticket-card");

        card.innerHTML = `
            <h3>${ticket.user}</h3>

            <p><strong>Categoria:</strong> ${ticket.category}</p>

            <p><strong>Descrição:</strong> ${ticket.description}</p>

            <span class="priority ${ticket.priority.toLowerCase()}">
                ${ticket.priority}
            </span>

            <span class="status">
                ${ticket.status}
            </span>

            <div class="ticket-actions">

                <button
                    class="btn-status"
                    onclick="toggleStatus(${ticket.id})"
                >
                    Alterar Status
                </button>

                <button
                    class="btn-delete"
                    onclick="deleteTicket(${ticket.id})"
                >
                    Excluir
                </button>

            </div>
        `;

        ticketsContainer.appendChild(card);
    });
}

ticketForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const user = document.getElementById("user").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const description = document.getElementById("description").value;

    const newTicket = {
        id: Date.now(),
        user,
        category,
        priority,
        description,
        status: "Aberto"
    };

    tickets.push(newTicket);

    saveTickets();
    renderTickets();

    ticketForm.reset();
});

function deleteTicket(id) {

    tickets = tickets.filter(ticket => ticket.id !== id);

    saveTickets();
    renderTickets();
}

function toggleStatus(id) {

    tickets = tickets.map(ticket => {

        if (ticket.id === id) {

            ticket.status =
                ticket.status === "Aberto"
                ? "Resolvido"
                : "Aberto";
        }

        return ticket;
    });

    saveTickets();
    renderTickets();
}

renderTickets();
