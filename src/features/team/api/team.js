// src/api/team.js
// Mock team + roles + invites
// TODO: Replace with:
//  GET /api/team
//  POST /api/team/invite
//  PATCH /api/team/:id (role change)
//  GET /api/team/audit-log

import { wait } from "../../../api/utils";

let mockTeam = [
  {
    id: "u1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    invited: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "u2",
    email: "user@example.com",
    name: "Standard User",
    role: "member",
    invited: false,
    createdAt: new Date().toISOString(),
  }
];

let mockAudit = [
  { id: "a1", event: "Admin User invited user@example.com", date: new Date().toISOString() }
];

export async function listTeam() {
  await wait(150);
  return { team: JSON.parse(JSON.stringify(mockTeam)) };
}

export async function invite(email) {
  await wait(200);
  const entry = {
    id: "u" + Date.now(),
    email,
    name: email.split("@")[0],
    role: "member",
    invited: true,
    createdAt: new Date().toISOString()
  };
  mockTeam.push(entry);
  mockAudit.unshift({
    id: "a" + Date.now(),
    event: `Invite sent to ${email}`,
    date: new Date().toISOString()
  });
  return { invited: true, entry };
}

export async function updateRole(id, role) {
  await wait(150);
  const user = mockTeam.find((u) => u.id === id);
  if (user) {
    user.role = role;
    mockAudit.unshift({
      id: "a" + Date.now(),
      event: `Role changed for ${user.email} → ${role}`,
      date: new Date().toISOString()
    });
  }
  return { ok: true };
}

export async function getAuditLog() {
  await wait(150);
  return { log: JSON.parse(JSON.stringify(mockAudit)) };
}
