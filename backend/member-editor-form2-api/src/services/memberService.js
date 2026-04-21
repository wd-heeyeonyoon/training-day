// src/services/memberService.js

// temporary in-memory "database"
let members = [
  { id: 1, name: "Leanne Graham", company: { name: "Romaguera-Crona" } },
  { id: 2, name: "Ervin Howell", company: { name: "Deckow-Crist" } },
  { id: 3, name: "Clementine Bauch", company: { name: "Romaguera-Jacobson" } },
  { id: 4, name: "Patricia Lebsack", company: { name: "Lebsack-Bode" } },
  { id: 5, name: "Chelsey Dietrich", company: { name: "Keebler-Lindgren" } },
  { id: 6, name: "Mrs. Dennis Schulist", company: { name: "Howell-Schultz" } },
  { id: 7, name: "Kurtis Weissnat", company: { name: "Considine-Lockman" } },
];

export function getAllMembers() {
  return members;
}

export function getMemberById(id) {
  return members.find((m) => m.id === id);
}

export function createMember({ name, companyName }) {
  const newMember = {
    id: members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1,
    name,
    company: { name: companyName },
  };
  members.push(newMember);
  return newMember;
}

export function updateMember(id, { name, companyName }) {
  const member = members.find((m) => m.id === id);
  if (!member) return null;

  member.name = name;
  member.company = { name: companyName };
  return member;
}

export function deleteMember(id) {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return false;
  members.splice(index, 1);
  return true;
}
