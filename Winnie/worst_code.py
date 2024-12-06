# Main Program: START HERE. Trust me, it's all you need.
def main():
    print("Welcome to Hospital Management System")
    login_user()

def login_user():
    user = input("Enter username (we don't check passwords, lol): ")
    if user == "admin":
        print("Welcome, Master of Chaos!")
        hospital_dashboard()
    else:
        print("Access denied. Restart the program to try again.")
        exit()

def hospital_dashboard():
    print("\n--- Hospital Dashboard ---")
    print("1. Register Patient")
    print("2. Check Appointments")
    print("3. Exit (doesn't really exit)")
    choice = input("Enter your choice: ")

    if choice == "1":
        patient_name = input("Enter patient name: ")
        print(f"Patient {patient_name} registered successfully!")
        hospital_dashboard()
    elif choice == "2":
        print("Appointments are handled... somewhere else.")
        hospital_dashboard()
    elif choice == "3":
        print("Goodbye! (Just kidding, the program will loop forever)")
        hospital_dashboard()
    else:
        print("Invalid choice, but who cares?")
        hospital_dashboard()

# Global variables for no reason
global_variable_x = 42
another_global_variable = "Oops, forgot to use these."

# Calling main because Python is fun like that.
main()
