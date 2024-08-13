const inputObject = {
  type: "array",
  count: 2,
  data: {
    name: "10 string",
    disc: "200 string",
    isValid: "true boolean",
    dataObject: { newKey: "10 string", name: "20 number" },
    dataArray: [{ name: "10 string" }],
    invalidType: "123 string",
    missingType: "500",
    arrayOfObjects: "[1,2,3] array",
    date: "date",
    // arrayWithCount: "5 arraywithcount",
    // objectsWithCount: "3 user objectwithcount",

    nestedArray: [
      "3 number",
      "false boolean",
      { deep: ["4 number", "invalid type"] },
      [
        "5 string",
        {
          deeper: '{"nested":"yes"} object',
        },
      ],
    ],
    nestedObject: {
      level1: "15 number",
      level2: {
        level3: "false boolean",
      },
    },
  },
};

function fetchData(callback) {
  console.log("called");
  $.ajax({
    type: "POST",
    url: "/mock",
    data: JSON.stringify(inputObject),
    contentType: "application/json",
    success: function (response) {
      callback(response); // Send the response back to the caller
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}
