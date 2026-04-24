# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Lab 6

## Summary
This is a React Native app built with Expo for managing and displaying student records, validating student data, and computing derived academic statuses.

## Main Features

- Create, edit, delete, and view student records
- Data persistence with AsyncStorage
- Validation for GPA, age, unique student ID, units, and graduation year
- Derived logic:
  - Academic Standing
  - Enrollment Load
  - Registration Hold
  - Risk Level
- Search, sorting, and filtering with live changes
- Analytics dashboard 
- Alerts and risk dashboard
- Load sample data
- Clear all data
- Reusable components for cards, forms, and screen sections


## Installing Dependencies
1. Clone Repository 
2. npm install

## How to use app
1. Records Screen
- View student records
- Search, sort, and filter students
- Delete students
- Load sample data
- Clear all data

2. Create and Edit Student
- Add a new student using the form
- Edit a student
- Validation make sure that:
  - GPA is within valid range
  - Student ID is unique
  - Age and units are within set range
  - Graduation year is valid

3. Analytics Screen displays:
   - Total number of students
   - Average GPA
   - Highest performing student
   - Distribution of academic standing
   - Students with registration holds
   - Statistics grouped by major

4. Alerts and Risk Screen
Displays students that:
- Have registration holds
- Are high risk of dismissal
- Are struggling 

## Setup
- All setup will be found at the top section of the README

## Explanation
- I used a validation file that utilized rules for ensuring that any and all student data was checked and this validation was used in editing and creating a student.
- For derived logic I used a derived file that determined academic standing, enrollment load, registration hold, and risk level and they update as students' data is updated which ensures that nothing is hardcoded.
- For analytics eveything is in the analytics folder and this one calculated more math heavy stuff so averages and totals but its all in one file so nothing is duplicated across pages.
- The data is handled by a context and reducer system which makes data predictable and and updates automatically when data changes.
- All data changes across all pages at the same time so its all in real time, and ensures that everything is functioning together and not separately. 