# LabTrace API

LabTrace is a robust backend API designed for laboratory order management. It is built with **Node.js** and **TypeScript**, implementing **Clean Architecture** principles to ensure code decoupling, testability, and scalability.

## 🚀 Key Features

* **Order Management:** Create orders, filter lists, and manage order lifecycles via a state machine (Created → Analysis → Completed).
* **Authentication:** Secure user registration and login using JWT stored in **HTTP-only cookies**.
* **Validation:** Strict input validation using Zod schemas.
* **Dependency Injection:** Managed via `tsyringe` for loose coupling.
* **Database:** MongoDB integration using Mongoose.
* **Testing:** Unit tests implemented with Vitest.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB (via Mongoose)
* **Validation:** Zod
* **Container/DI:** Tsyringe
* **Testing:** Vitest
* **Linter:** ESLint

## 📂 Architecture

The project follows a modular **Clean Architecture** structure:

* **`src/domain`**: Core business logic, entities (Order, User), and repository interfaces. Independent of external libraries.
* **`src/application`**: Use cases (business rules) that orchestrate the flow of data.
* **`src/infrastructure`**: External implementation details (Database, HTTP server, Controllers, Routes).
* **`src/shared`**: Cross-cutting concerns like Error Handling and Dependency Injection containers.

## ⚙️ Getting Started

### Prerequisites

* Node.js (v20+ recommended)
* Docker & Docker Compose (for the database)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/JoaoPedroSimsic/LabTrace.git](https://github.com/JoaoPedroSimsic/LabTrace.git)
    cd LabTrace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Duplicate the example environment file and configure it:
    ```bash
    cp .env.example .env
    ```

4.  **Start Database:**
    Run the MongoDB container:
    ```bash
    docker-compose up -d
    ```

5.  **Run the Server:**
    ```bash
    npm run dev
    ```
    The server will start on the port defined in `.env` (default: 3000).

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/create` | Register a new user |
| `POST` | `/auth/login` | Login and receive an **HTTP-only authentication cookie** |

### Orders (Protected)
*These endpoints are protected via an authentication cookie. Once logged in, your API client (like Insomnia or Postman) will automatically include the cookie in all subsequent requests.*

| Method | Endpoint | Description | payload example |
| :--- | :--- | :--- | :--- |
| `POST` | `/orders` | Create a new order | `{ "lab": "...", "patient": "...", "services": [...] }` |
| `GET` | `/orders` | Get orders (pagination & filters) | Body: `{ "page": 1, "limit": 10, "state": "CREATED" }` |
| `PATCH` | `/orders/:id/advance` | Advance order state | N/A |

## 🧪 Testing

The project uses **Vitest** for unit testing. Use the following command to run the suite:

```bash
npm run test
