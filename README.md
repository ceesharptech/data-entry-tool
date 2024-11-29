# Data Entry Tool Web Application  

The **Data Entry Tool Web Application** is a lightweight and intuitive tool built with **Next.js**, designed to simplify the process of updating Excel or CSV files. The app is mobile-responsive, user-friendly, and eliminates the need for account creation, making it accessible to anyone with a web browser.

---

## Features  
- **File Upload**: Upload Excel or CSV files to update directly within the app.  
- **Column Selection**: Choose the specific column in your file to edit.  
- **Individual Score Entry**: Assign scores to individual matriculation numbers.  
- **Group Score Entry**: Assign the same score to multiple matriculation numbers simultaneously.  
- **Matriculation Number Validation**: Ensures valid matriculation number formats for accuracy.  
- **File Download**: Download the updated file in Excel or CSV format with the changes applied.  
- **Responsive Design**: Fully optimized for both desktop and mobile devices.  

---

## Tech Stack  
- **Frontend Framework**: Next.js  
- **Styling**: Tailwind CSS  
- **File Handling**: FileReader API for processing Excel and CSV files.  
- **Excel/CSV Manipulation**: Libraries like `papaparse` for CSV and `xlsx` for Excel handling.  

---

## How to Use  
1. **Navigate to the App**  
   Simply visit the hosted web application link (to be added after deployment).  

2. **Upload Your File**  
   Click the upload button and select your Excel or CSV file.  

3. **Choose a Column**  
   The app will display the available columns in your file. Select the one you want to update.  

4. **Enter Scores**  
   - For individual scores: Enter the matriculation number and the corresponding score.  
   - For group scores: Enter multiple matriculation numbers and a single score to assign to all.  

5. **Download Your Updated File**  
   Save the modified file to your device.  

---

## Development  
To run the app locally:  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/data-entry-tool-web.git  
   cd data-entry-tool-web  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the development server:  
   ```bash  
   npm run dev  
   ```  
4. Open your browser and navigate to `http://localhost:3000`.  

---

## Contribution  
Contributions are welcome! Feel free to submit issues or pull requests to improve the tool.  

---

## License  
This project is licensed under the MIT License.  

---  

**Designed for efficiency and ease of use. Start automating your data entry today!**  
