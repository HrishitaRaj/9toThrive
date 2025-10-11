import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  trigger: React.ReactNode;
};

export default function SignInDialog({ trigger }: Props) {
  const [role, setRole] = useState<string>("student");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

  // useNavigate is available as `navigate` from hook above

    if (mode === "signin") {
      const payload = {
        email: String(data.get("email") || ""),
        password: String(data.get("password") || ""),
        role,
      };
      // TODO: call sign-in API
      console.log("Sign in payload:", payload);
      setOpen(false);
      // route based on role
      if (role === "student") navigate("/student", { replace: true });
      else if (role === "recruiter") navigate("/recruitment", { replace: true });
      else navigate("/placement", { replace: true });
    } else {
      const password = String(data.get("password") || "");
      const confirm = String(data.get("confirmPassword") || "");
      if (password !== confirm) {
        // Basic client-side validation
        alert("Passwords do not match");
        return;
      }
      const payload = {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        password,
        role,
      };
      // TODO: call sign-up API
      console.log("Sign up payload:", payload);
      setOpen(false);
      // route to appropriate dashboard after sign up
      if (role === "student") navigate("/student", { replace: true });
      else if (role === "recruiter") navigate("/recruitment", { replace: true });
      else navigate("/placement", { replace: true });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In to 9toThrive</DialogTitle>
          <DialogDescription>
            Choose a role and sign in to access your dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          {/* Switcher link */}
          <div className="flex justify-end">
            {mode === "signin" ? (
              <button type="button" className="text-sm underline" onClick={() => setMode("signup")}>
                Create an account
              </button>
            ) : (
              <button type="button" className="text-sm underline" onClick={() => setMode("signin")}>
                Already have an account?
              </button>
            )}
          </div>
          {mode === "signup" && (
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <Input name="name" type="text" placeholder="Your full name" />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input name="email" type="email" placeholder="you@school.edu" required />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input name="password" type="password" placeholder="Enter your password" required />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-sm mb-1">Confirm password</label>
              <Input name="confirmPassword" type="password" placeholder="Repeat password" required />
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Role</label>
            <RadioGroup value={role} onValueChange={setRole} className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="student" />
                <span className="text-sm">Student</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="recruiter" />
                <span className="text-sm">Recruiter</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="placement" />
                <span className="text-sm">Placement Cell</span>
              </label>
            </RadioGroup>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            {mode === "signin" ? (
              <>
                <Button variant="ghost" type="button" onClick={() => setMode("signup")}>
                  Create account
                </Button>
                <Button type="submit">Sign In</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" type="button" onClick={() => setMode("signin")}>Already have an account?</Button>
                <Button type="submit">Create Account</Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
