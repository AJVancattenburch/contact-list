let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target

let contact = {
  id: generateId(),
  name: form.name.value,
  phone: form.phone.value,
  emergencyContact: form.emergencyContact.checked
}
contacts.push(contact)
saveContacts()
form.reset()
}


function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

function loadContacts() {
 let storedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (storedContacts) {contacts=storedContacts}
}


function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let contactsTemplate = ""
  contacts.forEach(contact => {
    contactsTemplate += `
      <div class="contact-card card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <p>
        <i class="fa fa fw fa-phone"></i>
        <span>${contact.phone}</span>
        </p>
        <i class="action fafa-trash text-danger" onclick="removeContact('${contact.id}')">remove</i>
      </div>
      `
  })
  contactListElement.innerHTML = contactsTemplate
}


/**
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contacts => contactId == contacts.id)
  if (index == -1) {
    throw new Error("Glitch in the Universe. Initiating self destruct sequence in 3...2...1...")
  }
  contacts.splice(index, 1)
  saveContacts()
}


/**
 */
function toggleAddContactForm() {
  let addContactElem = document.getElementById('new-contact-form').classList.toggle("hidden")
  
}


/**
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()