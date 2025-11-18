import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Clock, ArrowRight } from "lucide-react";

// Mock Data (Nantinya diganti dengan fetch dari Supabase)
const pendingBatches = [
  { id: "BATCH-2024-001", exporter: "PT. Samudera Indonesia", product: "Udang Vaname", date: "18 Nov 2025", status: "PENDING" },
  { id: "BATCH-2024-004", exporter: "CV. Laut Makmur", product: "Tuna Loin", date: "18 Nov 2025", status: "PENDING" },
  { id: "BATCH-2024-005", exporter: "PT. Agro Laut", product: "Rumput Laut Kering", date: "17 Nov 2025", status: "PENDING" },
];

export default function BatchPendingPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Antrean Pengujian</h1>
          <p className="text-slate-600 mt-1">Daftar batch yang menunggu verifikasi laboratorium.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-lg border border-amber-200">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{pendingBatches.length} Batch Menunggu</span>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-500" />
            Daftar Pending
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="w-[150px]">ID Batch</TableHead>
                <TableHead>Eksportir</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Tanggal Masuk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingBatches.map((batch) => (
                <TableRow key={batch.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{batch.id}</TableCell>
                  <TableCell>{batch.exporter}</TableCell>
                  <TableCell>{batch.product}</TableCell>
                  <TableCell>{batch.date}</TableCell>
                  <TableCell>
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                      Proses <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}