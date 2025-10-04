// utils/withRole.tsx
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";
import { useAuth } from "@/contexts/AuthContext"; // your custom auth hook

export default function withRole<P extends object>(
  Component: ComponentType<P>,
  allowedRoles: string[]
) {
  return function ProtectedPage(props: P) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) router.replace("/login");
      else if (!allowedRoles.includes(user.role)) router.replace("/unauthorized");
    }, [user]);

    return <Component {...props} />;
  };
}
