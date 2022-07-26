//это асинхронный участок кода, значит нужно async (ставится перед функцией в месте ее объявления) await (ставится перед каждой операцией, которую нужно дождаться)
const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });

    // console.log(result);
    return await result.json();
  };
  export {postData};
