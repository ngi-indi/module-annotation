# Step 1: Use an official Node.js image as the base
FROM node:14-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies, including axios
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose port 3000 to the outside world (default React development server port)
EXPOSE 3000

# Step 7: Start the React app using npm start
CMD ["npm", "start"]
