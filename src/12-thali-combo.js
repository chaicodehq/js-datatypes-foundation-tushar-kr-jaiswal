/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
    if (
        typeof thali !== "object" ||
        Array.isArray(thali) ||
        thali === null ||
        Object.keys(thali).length === 0
    )
        return "";

    let { name, isVeg, items, price } = thali;

    if (!name || typeof isVeg !== "boolean" || !items || !price) return "";

    let finalThali = `${name?.toUpperCase()} (${isVeg ? "Veg" : "Non-Veg"}) - Items: ${items.join(", ")} - Rs.${price.toFixed(2)}`;

    return finalThali;
}

export function getThaliStats(thalis) {
    if (typeof thalis !== "object" || !Array.isArray(thalis) || thalis.length === 0) return null;
    let totalThalis = thalis.length;
    // let vegCount;
    let vegCount = thalis.filter((object) => object.isVeg).length;
    let nonVegCount = totalThalis - vegCount;
    let avgPrice = thalis.reduce((total, object) => total + object.price, 0) / totalThalis;
    avgPrice = avgPrice.toFixed(2);
    let priceArr = thalis.map((object) => Number(object.price));
    let cheapest = Math.min(...priceArr);
    let costliest = Math.max(...priceArr);
    let names = thalis.map((obj) => obj.name);
    console.log({ totalThalis, vegCount, nonVegCount, avgPrice, cheapest, costliest, names });
    return { totalThalis, vegCount, nonVegCount, avgPrice, cheapest, costliest, names };
}

export function searchThaliMenu(thalis, query) {
    if (typeof thalis !== "object" || !Array.isArray(thalis) || thalis === null) return [];
    if (typeof query !== "string" && typeof query !== "boolean") return [];
    if (typeof query !== "string" && query.trim() === "") return thalis;
    console.log(query);
    query = query.toLowerCase();

    return thalis.filter((thali) => {
        let name = thali.name.toLowerCase().includes(query);

        let price = String(thali.price) === query;

        let isVeg;
        if (query === "true") {
            isVeg = thali.isVeg === true;
        } else if (query === "false") {
            isVeg = thali.isVeg === false;
        } else {
            isVeg = false;
        }

        let item = thali?.items
            ? thali.items.some((item) => item.toLowerCase().includes(query))
            : false;

        return name || price || isVeg || item;
    });
}

export function generateThaliReceipt(customerName, thalis) {
    // validation
    if (typeof customerName !== "string" || customerName.trim() === "") return "";
    if (!Array.isArray(thalis) || thalis.length === 0) return "";

    // declaration
    let itemNames = thalis.map((thali) => `- ${thali.name} x Rs.${thali.price}`).join("\n");
    let total = thalis.reduce((acc, thali) => acc + Number(thali.price), 0);

    // receipt format
    return `THALI RECEIPT\n
    ---
    Customer: ${customerName.toUpperCase()}
    ${itemNames}
    ---
    Total: Rs.${total}
    Items: ${thalis.length}`;
}
