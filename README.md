Steps for Cloning the repo :

1. Navigate to the Directory Where You Want to Clone the Repository:
Use the cd command to navigate to the directory where you want to clone the repository. For example, if you want to clone the repository into your "Documents" folder, you would use:
cd Documents
2. Clone the Repository:
Once you're in the desired directory, use this git clone command :
git clone https://github.com/Hritik-Ubale/Health_Clinic_Management_System.git
Press Enter:
Press Enter to execute the git clone command. Git will start downloading the repository files to your local machine.
3. Add env
Once you have everything cloned perfectly. Add an environment file i.e add a file named .env to the root. In the file add credentils with keys below : 

PORT=<port-to-run-app>
DB_HOST=<db-host>
DB_PORT=<db-port>
DB_USERNAME=<db-username>
DB_PASSWORD=<db-password>
DB_NAME=<db-name>
DB_SYNC=<boolean true/false whether you wanna synchronize database>

In place of place holders given by < >, add you credentils.

4. Install necessary packages

On terminal run command : 
npm i

5. Run the project 

In the terminal run command :

npm start

If it logs :

SERVER LISTENING AT PORT : ${<your-PORT>}

Congrats the application is up and running. Else try redoing the above steps. You can also use chatGpt for any assistance needed.


API Endpoints and Output :

In our project, both doctors and patients are managed within a single table named "users." This approach stems from considering both groups as users, distinguished by the roles they possess. Consequently, the APIs for adding, updating, and deleting users remain consistent regardless of whether they are doctors or patients.

1. Create User

Endpoint:	POST  /user
Description: Adds a new user.
Example Request:
{
    "name": "doctor",
    "email": "doctor@example.com",
    "roles": ["DOCTOR"],
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "department": "ORTHO",
    "phoneNumber": "1256900789",
    "availability": [{ "date": "12-04-24", "start": "9:00 AM", "end" : "10:00 PM" },{ "date": "12-04-24", "start": "4:00 AM", "end" : "5:00 PM" },{ "date": "12-04-24", "start": "1:00 AM", "end" : "3:00 PM" }]
}
Example Response:
{
    "message": "Created Successfully.",
    "data": {
        "name": "doctor",
        "email": "doctor@example.com",
        "roles": [
            "DOCTOR"
        ],
        "dateOfBirth": "1990-01-01T00:00:00.000Z",
        "department": "ORTHO",
        "phoneNumber": "1256900789",
        "availability": [
            {
                "date": "12-04-24",
                "start": "9:00 AM",
                "end": "10:00 PM"
            },
            {
                "date": "12-04-24",
                "start": "4:00 AM",
                "end": "5:00 PM"
            },
            {
                "date": "12-04-24",
                "start": "1:00 AM",
                "end": "3:00 PM"
            }
        ],
        "deletedAt": null,
        "id": "e3f59299-c0f0-4b3d-9011-e11812000e64",
        "createdAt": "2024-04-11T22:27:38.761Z",
        "updatedAt": "2024-04-11T22:27:38.761Z"
    },
    "statusCode": 200
}

2. Update User
 
Endpoint:	PATCH   /user/:id
Description: Updates an existing new user. 
Example Request:
id is sent in params and data to be updated in body. 
{
		"name" : "doctor-sham",
		"email" : "doc@example.com",
		"roles" : "DOCTOR",
		"dateOfBirth" : "1990-01-01T00:00:00.000Z",
		"department" : "IT",
		"phoneNumber" : "1234597890",
		"availability" : [{"end": "5:00 PM", "date": "12\/04\/24", "start": "9:00 AM"}],
		"createdAt" : "2024-04-11T19:54:49.140Z",
		"updatedAt" : "2024-04-11T19:54:49.140Z",
		"deletedAt" : null
}
Example Response:
{
    "message": "Updated Successfully.",
    "data": {
        "generatedMaps": [],
        "raw": [],
        "affected": 1
    },
    "statusCode": 200
}

3. Delete User

Endpoint:	DELETE  /user/:id
Description:  Soft Deletes a new user.
Example Request:
Send id in params.
Example Response:
{
    "message": "Deleted Successsfully",
    "data": {
        "generatedMaps": [],
        "raw": [],
        "affected": 1
    },
    "statusCode": 200
}

4.  Retrieve patient details by patient ID

Endpoint:	GET  /user/:id
Description: Used to get a user preferably Patient in our case.
Example Request:
Send id in params.
Example Response:
{
    "message": "Request Successful.",
    "data": {
        "id": "3029ef00-85bd-4f81-830d-ec752227160d",
        "name": "for deletion",
        "email": "delev@example.com",
        "roles": [
            "DOCTOR",
            "PATIENT"
        ],
        "dateOfBirth": "1990-01-01T00:00:00.000Z",
        "department": "BOTH",
        "phoneNumber": "1239007890",
        "availability": [
            {
                "end": "5:00 PM",
                "date": "12-04-24",
                "start": "9:00 AM"
            }
        ],
        "createdAt": "2024-04-11T20:41:53.013Z",
        "updatedAt": "2024-04-11T20:41:53.013Z",
        "deletedAt": null
    },
    "statusCode": 200
}


5.  Book an appointment

Endpoint:	POST  /appointment
Description: Book an appointment.
Example Request:
{
    "patient" : "3029ef00-85bd-4f81-830d-ec752227160d",
    "doctor" : "8de6376b-fc53-4546-a5ef-2fa780cce443",
    "preferredSlot" : { "end": "10:00 PM", "date": "12-04-24", "start": "9:00 AM" }
}
Example Response:
{
    "message": "Created Successfully.",
    "data": {
        "patient": "3029ef00-85bd-4f81-830d-ec752227160d",
        "doctor": "8de6376b-fc53-4546-a5ef-2fa780cce443",
        "preferredSlot": {
            "end": "10:00 PM",
            "date": "12-04-24",
            "start": "9:00 AM"
        },
        "deletedAt": null,
        "id": "16d06e9b-1581-45b8-81b5-d7fdd00e538c",
        "createdAt": "2024-04-11T23:19:39.171Z",
        "updatedAt": "2024-04-11T23:19:39.171Z"
    },
    "statusCode": 200
}

6. Update an Appointment

Endpoint:	PATCH  /appointment/:id
Description: Update an appointment.
Example Request:
Send id in params. Data to be updated in body.
{		"preferredSlot" : {"end": "6:00 PM", "date": "12/04/24", "start": "9:00 AM"},
		"createdAt" : "2024-04-11T21:49:54.984Z",
		"updatedAt" : "2024-04-11T21:49:54.984Z",
		"deletedAt" : null,
		"patient" : "7afec10e-783f-4f61-ba34-5361d21e2942",
		"doctor" : "b040466a-76af-4616-8b5b-001f5d7c25ad"
}
Example Response:
{
    "message": "Updated Successfully.",
    "data": {
        "generatedMaps": [],
        "raw": [],
        "affected": 0
    },
    "statusCode": 200
}

7. Cancel Appointment

Endpoint:	GET   /appointment/cancel/:id
Description: Cancel the appointment.
Example Request:
Send Id params.
Example Response:
{
    "message": "Request Successful.",
    "data": {
        "generatedMaps": [],
        "raw": [],
        "affected": 1
    },
    "statusCode": 200
}

8. List appointments for a specific doctor on a given day

Endpoint:	GET   /user/:doctorId/slots/:date
Description: List appointments for a specific doctor on a given day.
Example Request:
Send doctorId and date in params.
Example Response:
{
    "message": "Request Successful.",
    "data": [
        {
            "end": "10:00 PM",
            "date": "12-04-24",
            "start": "9:00 AM"
        },
        {
            "end": "5:00 PM",
            "date": "12-04-24",
            "start": "4:00 AM"
        },
        {
            "end": "3:00 PM",
            "date": "12-04-24",
            "start": "1:00 AM"
        }
    ],
    "statusCode": 200
}


9. Find available time slots for a doctor, considering existing appointments and doctor's availability.

Endpoint:	GET    /user/availibility/:doctorId
Description:  Find available time slots for a doctor, considering existing appointments and doctor's availability.
Example Request:
Send doctorId in params.
Example Response:
{
    "message": "Request Successful.",
    "data": [
        {
            "end": "5:00 PM",
            "date": "12-04-24",
            "start": "4:00 AM"
        },
        {
            "end": "3:00 PM",
            "date": "12-04-24",
            "start": "1:00 AM"
        }
    ],
    "statusCode": 200
}
