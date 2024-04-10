# Employee Managment System

The Employee Management System is a versatile application designed to efficiently manage workforce systems across various organizational structures. This application comprises a server-side component developed in .NET using a 3-layer model, with connectivity to a SQL Server database employing Entity Framework. On the client side, a React-based interface is employed, integrating advanced technologies such as MobX and React Hook Form. The application's user interface is elegantly crafted using Material-UI (MUI).

## Features

- **Structured Employee Table**: Presents a well-organized table containing comprehensive details of all employees. Users can print the table and export it to an Excel file.
- **Column Control**: Allows users to customize the displayed columns in the employee table.
- **Employee Addition and Editing**: Users can seamlessly add new employees and edit existing ones. The addition and editing functionalities are rigorously tested and validated through various checks and validations.
- **Role Management**: Provides users with the capability to manage the roles of each employee, allowing for additions or removals as required.
- **Feedback System**: The system promptly provides feedback to users regarding the validity of their actions, enhancing user experience and ensuring smooth operation.
- **Intuitive User Interface**: Designed with a focus on user convenience and efficiency, the application offers a smart and user-friendly interface.

## Technologies Used

- **Server-Side**: .NET, Entity Framework, SQL Server
- **Client-Side**: React, MobX, React Hook Form
- **UI Design**: Material-UI (MUI)


## Installation

1. **Clone the Repository**: 
    ```
    git clone https://github.com/cohentamarwolf/Employee-Managment-System.git
    ```

2. **Server-Side Setup**: 
    - Navigate to the server-side directory: 
        ```
        cd server
        ```
    - Connect to DB: 
        ```
        Add-Migration MigrationName
        ```
        
        ```
        Update-Database
        ```
    - Start the server: 
        ```
        start
        ```

3. **Client-Side Setup**: 
    - Navigate to the client-side directory: 
        ```
        cd ../client
        ```
    - Install dependencies: 
        ```
        npm install
        ```
    - Start the client: 
        ```
        npm run dev
        ```

4. Access the application via the provided URL.


## Usage

- Upon accessing the application, users are greeted with the structured employee table.
- Users can seamlessly navigate through various functionalities such as printing, exporting, adding, editing, and managing roles.
- The system provides instant feedback regarding the validity of user actions, ensuring a smooth and efficient user experience.

## Feedback and Contributions

We welcome any feedback or suggestions for improvement. Feel free to reach out to us with your thoughts. Contributions are also encouraged; please submit a pull request or open an issue if you have any suggestions or improvements to offer.

## License

This project is licensed under the MIT License. Feel free to modify and distribute it as per the terms of the license.

---

This README was authored by Tamar Cohen.
