const mp = new MercadoPago("APP_USR-9b455905-3ab6-40c4-a5ef-3225744cfb08", {
  locale: "pt-BR",
});

// PRODUÇÃO API:  APP_USR-f2c0531e-cdfc-435e-a053-5a214f91ea7e

document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    const orderData = {
      title: document.querySelector(".name").innerText,
      quantity: 1,
      price: document.querySelector(".price").innerText,
    };

    const response = await fetch("http://localhost:3000/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const preference = await response.json();
    createCheckoutButton(preference.id);
  } catch (error) {
    alert("error :(");
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  };

  renderComponent();
};
