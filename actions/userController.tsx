"use server";

export const register = async function () {
  console.log("Hello, this is executing on the server!");
  return {
    skyColor: "blue",
    grassColor: "green",
  };
};
