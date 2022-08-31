window.addEventListener("DOMContentLoaded", get);
const submit = document.getElementById("submit");
//submit.addEventListener("click", insertExpense);
const ul = document.getElementById("data");

function insertExpense() {
  const amnt = document.getElementById("amount").value;
  const expenseFor = document.getElementById("expense").value;
  const cat = document.getElementById("cat").value;
  const obj = {
    amnt,
    expenseFor,
    cat,
  };

  axios.post(
    "https://crudcrud.com/api/993ab15ba7d04c6e980c9dc874ba8d84/ExpenseTracker",
    obj
  );
}

function display(res) {
  for (let i = 0; i < res.length; i++) {
    var del = document.createElement("button");
    var edit = document.createElement("button");

    var tr = document.createElement("TR");
    var tdA = document.createElement("TD");
    var tdD = document.createElement("TD");
    var tdC = document.createElement("TD");
    var tdAC = document.createElement("TD");

    tdA.innerHTML = `₹ ${res[i].amnt}`;
    tdD.innerHTML = `${res[i].expenseFor}`;
    tdC.innerHTML = `${res[i].cat}`;

    del.innerHTML = "Delete";
    edit.innerHTML = "Edit";
    del.setAttribute("onclick", `Delete('${res[i]._id}')`);
    edit.setAttribute(
      "onclick",
      `Edit('${res[i]._id}','${res[i].amnt}','${res[i].expenseFor}','${res[i].cat}')`
    );
    tdAC.append(del, edit);
    tr.setAttribute("id", `${res[i]._id}`);

    tr.append(tdA, tdD, tdC, tdAC);
    ul.append(tr);
  }
}

async function get() {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/993ab15ba7d04c6e980c9dc874ba8d84/ExpenseTracker"
    );

    display(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function Delete(id) {
  try {
    const res = await axios.delete(
      `https://crudcrud.com/api/993ab15ba7d04c6e980c9dc874ba8d84/ExpenseTracker/${id}`
    );

    document.getElementById(`${id}`).remove();
  } catch (err) {
    console.log(err);
  }
}

async function Edit(id, amnt, expenseFor, cat) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("edit").style.visibility = "visible";
  document.getElementById("amount").value = amnt;
  document.getElementById("expense").value = expenseFor;
  document.getElementById("cat").value = cat;
  document.getElementById("edit").addEventListener("click", function () {
    Delete(id).then(insertExpense());
  });
}
