import React from "react";
import Card from "../Surface/Card";
import Input from "../Form/Input";
import Button from "../Form/Button";

export default function TeamTable({ members, isAdmin, onRoleChange }) {
  return (
    <Card padding="md" radius="lg" shadow="sm">
      <div className="text-sm font-semibold mb-3">Members</div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Invited</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="py-2">{m.name}</td>
              <td>{m.email}</td>
              <td>
                {isAdmin ? (
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    value={m.role}
                    onChange={(e) =>
                      onRoleChange(m.id, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                    <option value="viewer">Viewer</option>
                  </select>
                ) : (
                  m.role
                )}
              </td>
              <td>{m.invited ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
