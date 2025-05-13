import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
title: "Task Manager App",
description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }) {
return (
<html lang="en">
<body className={inter.className}>
<AuthProvider> {/* ✅ Wrap app with context */}
{children}
</AuthProvider>
</body>
</html>
);
}