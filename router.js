const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.get("/", async (req, res) => {
  console.log("getting requrest");
  let salt = 10;
  const pass = await bcrypt.hash("Adilshaa", salt);

  res.json({ stats: " success", data: pass });
});

app.post("/mock", (req, res) => {
  const { body } = req;
  let { data, type, count } = body;
  if (count == 0) count = 1;
  function generateDynamicStructure(input, type, count) {
    if (type === "array") {
      return Array.from({ length: count }, () =>
        generateDynamicStructure(input, "object")
      );
    } else if (type === "object") {
      console.log(type);
      return processInput(input); // Convert the input object as before
    } else {
      console.error(
        `Invalid type parameter: ${type}. Use "array" or "object".`
      );
      throw new Error('Invalid type parameter. Use "array" or "object".');
    }
  }

  function processInput(input) {
    if (Array.isArray(input)) {
      return input.map((value) => processValue(value));
    } else if (typeof input === "object" && input !== null) {
      const result = {};
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          result[key] = processValue(input[key], key); // Pass the key
        }
      }
      return result;
    }
    return input;
  }

  function processValue(value, key) {
    if (key === "name") {
      // Return an actual name
      const names = ["John", "Emma", "Oliver", "Ava", "William", "Sophia"];
      return names[Math.floor(Math.random() * names.length)];
    } else if (typeof value === "string" && value.includes(" ")) {
      const [val, type] = value.split(" ", 2);
      switch (type.toLowerCase()) {
        case "number":
          return generateRandomNumber(Number(val));
        case "string":
          return generateRandomString(Number(val));
        case "date":
          return new Date();
        case "boolean":
          return val.toLowerCase() === "true";
        case "object":
          try {
            return JSON.parse(val);
          } catch {
            return {}; // Return empty object on JSON parsing failure
          }
        case "array":
          try {
            return JSON.parse(val);
          } catch {
            return []; // Return empty array on JSON parsing failure
          }
        case "arrayofobjects":
          return generateArrayOfObjects(Number(val));
        // case "arraywithcount":
        //   return generateArrayOfObjects(Number(val), "default");
        // case "objectwithcount":
        //   return generateObjectsWithCount(Number(val), "default");
        default:
          return handleInvalidType(val);
      }
    } else if (Array.isArray(value)) {
      return value.map((item) => processValue(item));
    } else if (typeof value === "object" && value !== null) {
      return processInput(value);
    } else {
      return handleInvalidType(value);
    }
  }

  function generateArrayOfObjects(count) {
    const arrayOfObjects = [];

    for (let i = 0; i < count; i++) {
      arrayOfObjects.push({ id: i + 1, value: generateRandomString(5) });
    }
    return arrayOfObjects;
  }

  // function generateObjectsWithCount(count, objType) {
  //   const objects = [];
  //   for (let i = 0; i < count; i++) {
  //     objects.push(generateCustomObject(objType));
  //   }
  //   return objects;
  // }

  function generateCustomObject(type) {
    // Example custom object generation based on type
    switch (type.toLowerCase()) {
      case "user":
        return {
          userId: Math.floor(Math.random() * 1000),
          username: generateRandomString(8),
        };
      case "product":
        return {
          productId: Math.floor(Math.random() * 1000),
          productName: generateRandomString(10),
        };
      // Add more custom object types as needed
      default:
        return { type: "unknown", description: generateRandomString(6) };
    }
  }

  function generateRandomString(length) {
    const characters =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    let randomNumber;

    function random() {
      randomNumber = Math.floor(Math.random() * characters.length);
      if (randomNumber < length) {
        randomNumber = random();
      }
    }

    random();
    let result = "";

    for (let i = 0; i < length; i++) {
      let split = characters.slice(randomNumber).split("");
      if (i === length - 1) {
        result = split.slice(0, length);
      }
      // result += characters.length;
      // result += characters.charAt(
      //   Math.floor(Math.random() * characters.length)
      // );
    }
    return result.join("");
  }

  function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleInvalidType(value) {
    // Default handling for invalid or missing types
    if (!isNaN(value)) {
      return generateRandomNumber(Number(value));
    }
    return generateRandomString(5); // Default string length
  }

  // Example usage:

  try {
    const result = generateDynamicStructure(data, type, count);
    // const result = generateDynamicStructure(inputObject, 'object');

    // console.log(result);
    res.json({ data: result });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = app;
