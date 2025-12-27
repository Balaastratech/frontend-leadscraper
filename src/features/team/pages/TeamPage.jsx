import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam, changeRole, fetchAudit, inviteUser } from "../store/teamSlice";
import Title from "../../../ui/Typography/Title";
import Button from "../../../ui/Form/Button";

import TeamTable from "../../../ui/Team/TeamTable";
import TeamAudit from "../../../ui/Team/TeamAudit";
import TeamInviteModal from "../../../features/team/components/TeamInviteModal";

export default function TeamPage() {
  const dispatch = useDispatch();
  const { members, audit, loading } = useSelector((s) => s.team);
  const auth = useSelector((s) => s.auth.user);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    dispatch(fetchTeam());
    dispatch(fetchAudit());
  }, [dispatch]);

  const isAdmin = auth?.role === "admin";

  if (loading) return <div>Loading team…</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title size="lg">Team Management</Title>

        
          <Button variant="primary" size="sm" onClick={() => setShowInvite(true)}>
            Invite
          </Button>
        
      </div>

      <TeamTable
        members={members}
        isAdmin={isAdmin}
        onRoleChange={(id, role) => dispatch(changeRole({ id, role }))}
      />

      <TeamAudit audit={audit} />

      <TeamInviteModal
        open={showInvite}
        onClose={() => setShowInvite(false)}
        onInvite={(email) => dispatch(inviteUser(email))}
      />
    </div>
  );
}
