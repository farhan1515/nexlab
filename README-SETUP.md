# Backend Setup Guide (Contact Form)

To make the "Contact Us" form work perfectly, follow these simple steps to connect it to **EmailJS** (a free service that sends emails directly from the frontend).

## Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for a free account.

## Step 2: Add an Email Service
1. Log in to your dashboard.
2. Click **"Add New Service"**.
3. Select **"Gmail"** (or your preferred email provider).
4. Click **"Connect Account"** and allow access.
5. Click **"Create Service"**.
6. Copy the **Service ID** (e.g., `service_xxxxx`).

## Step 3: Create an Email Template
1. Go to the **"Email Templates"** tab on the left.
2. Click **"Create New Template"**.
3. Design your email. Use the following variables to capture form data:
   - `{{from_name}}` (User's Name)
   - `{{from_email}}` (User's Email)
   - `{{phone}}` (WhatsApp Phone Number)
   - `{{company}}` (Company Name)
   - `{{service}}` (Service Selected)
   - `{{message}}` (The Message)

   **Example Subject Line:**
   `New Inquiry from {{from_name}} - {{service}}`

   **Example Content:**
   ```
   Name: {{from_name}}
   Email: {{from_email}}
   WhatsApp: {{phone}}
   Company: {{company}}
   Service: {{service}}
   
   Message:
   {{message}}
   ```
4. Save the template.
5. Copy the **Template ID** (e.g., `template_xxxxx`).

## Step 4: Get Your Public Key
1. Go to the **"Account"** page (click your avatar in top right).
2. Copy your **Public Key** (e.g., `user_xxxxx` or `XyZ...`).

## Step 5: Configure the Project
1. In the root of your project (where `package.json` is), create a new file named `.env`.
2. Add the following lines, replacing the values with your copied IDs:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Test It!
1. Restart your development server (`npm run dev`) if it's running, so it picks up the new `.env` file.
2. Go to the "Contact" section on your website.
3. Fill out the form and click "Send Request".
4. You should receive an email instantly!

---

**Troubleshooting:**
- If you see an error "Configuration Error: Missing EmailJS keys", double-check your `.env` file and restart the server.
- Ensure the variable names start with `VITE_`.
