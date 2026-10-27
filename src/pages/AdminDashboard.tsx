import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminDashboard() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [newTender, setNewTender] = useState({ tender_no: '', title: '', closing_date: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: tData } = await supabase.table('tenders').select('*').order('created_at', { ascending: false });
    const { data: vData } = await supabase.table('registered_vendors').select('*').order('created_at', { ascending: false });
    if (tData) setTenders(tData);
    if (vData) setVendors(vData);
  };

  const handleCreateTender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTender.tender_no || !newTender.title) return;
    await supabase.table('tenders').insert([newTender]);
    setNewTender({ tender_no: '', title: '', closing_date: '' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-8">
      <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rashtra Bharosa Group</h1>
          <p className="text-slate-400 text-sm mt-1">Enterprise Mission Control & CMS Dashboard</p>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full">
          Live Backend Connected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader>
            <CardTitle className="text-lg">Publish New Public Tender</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTender} className="space-y-4">
              <Input
                placeholder="Tender No (e.g. RBG-T-2026-01)"
                value={newTender.tender_no}
                onChange={e => setNewTender({ ...newTender, tender_no: e.target.value })}
                className="bg-slate-950 border-slate-700"
              />
              <Input
                placeholder="Tender Title / Scope"
                value={newTender.title}
                onChange={e => setNewTender({ ...newTender, title: e.target.value })}
                className="bg-slate-950 border-slate-700"
              />
              <Input
                type="date"
                value={newTender.closing_date}
                onChange={e => setNewTender({ ...newTender, closing_date: e.target.value })}
                className="bg-slate-950 border-slate-700"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Add Tender
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Active Tenders ({tenders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tenders.length === 0 ? (
                <p className="text-sm text-slate-500">No tenders created yet. Use form on left to create one.</p>
              ) : (
                tenders.map((t) => (
                  <div key={t.id} className="p-3 bg-slate-950/60 rounded border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{t.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Tender ID: {t.tender_no}</p>
                    </div>
                    <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
                      Due: {t.closing_date || 'TBD'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">Registered Vendor Organizations ({vendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vendors.length === 0 ? (
              <p className="text-sm text-slate-500">No vendor registrations yet.</p>
            ) : (
              vendors.map((v) => (
                <div key={v.id} className="p-3 bg-slate-950/60 rounded border border-slate-800 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{v.company_name}</span>
                    <span className="text-xs text-slate-400 ml-3">GSTIN: {v.cin_gstin}</span>
                  </div>
                  <span className="text-xs text-slate-400">{v.email}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
