import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Pastikan install tabs jika belum: npx shadcn-ui@latest add tabs
import { User, Lock, ShieldCheck, Building } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Pengaturan Akun</h1>
        <p className="text-slate-600 mt-1">Kelola informasi profil perusahaan dan keamanan akun Anda.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-8">
          <TabsTrigger value="profile">Profil Perusahaan</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        {/* Tab Profil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Informasi Entitas
              </CardTitle>
              <CardDescription>
                Informasi ini akan ditampilkan pada Sertifikat Digital (JAMIN-QR).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Nama Perusahaan</Label>
                  <Input id="company" placeholder="PT. Contoh Ekspor Indonesia" defaultValue="PT. Samudera Indonesia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nib">Nomor Induk Berusaha (NIB)</Label>
                  <Input id="nib" placeholder="812000..." defaultValue="81201019283" disabled className="bg-slate-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Resmi</Label>
                  <Input id="email" type="email" defaultValue="contact@samudera.co.id" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" defaultValue="+62 21 555 0199" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Input id="address" defaultValue="Jl. Pelabuhan Tanjung Priok No. 45, Jakarta Utara" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 px-6 py-4 bg-slate-50/50 flex justify-end">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white">Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab Keamanan */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Kredensial Login
              </CardTitle>
              <CardDescription>
                Amankan akun Anda dengan password yang kuat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Password Saat Ini</Label>
                <Input id="current" type="password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new">Password Baru</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Konfirmasi Password Baru</Label>
                  <Input id="confirm" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 px-6 py-4 bg-slate-50/50 flex justify-end">
              <Button variant="destructive">Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}