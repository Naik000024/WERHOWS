import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal'; // Ensure you have the Modal component we created
import { API } from '../api';
import { Inventory as InventoryType } from '../types'; // Use the Inventory interface for stock data

const Inventory: React.FC = () => {
    const [items, setItems] = useState<InventoryType[]>([]);
    const [loading, setLoading] = useState(true);
    
    // State for Modal and Search
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryType | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchInventory = async () => {
        try {
            setLoading(true);
            // We fetch from 'inventory/' because that's where 'quantity_available' lives
            const response = await API.get('inventory/');
            setItems(response.data);
        } catch (error) {
            console.error("FAILED_TO_FETCH_REGISTRY", error);
        } finally {
            setLoading(false);
        }
    };

    // --- BUTTON LOGIC ---

    const handleViewDetails = (item: InventoryType) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`CRITICAL_ACTION: Purge ${name} from database?`)) {
            try {
                // Adjust endpoint to your Django URL (usually 'products/' for full deletion)
                await API.delete(`inventory/${id}/`);
                setItems(prev => prev.filter(i => i.id !== id));
            } catch (error) {
                console.error("DELETE_FAILED", error);
            }
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    // Filter items based on search
    const filteredItems = items.filter(item => 
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout title="Inventory_Database">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-neon-cyan font-black tracking-widest uppercase text-sm">
                        [ Global_Stock_Registry ]
                    </h2>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">
                        TOTAL_SKUS_INDEXED: {filteredItems.length}
                    </p>
                </div>

                {/* Added a search bar that matches your design */}
                <input 
                    type="text"
                    placeholder="SEARCH_BY_NAME..."
                    className="bg-black/40 border border-gray-800 px-4 py-1 text-[10px] text-white focus:border-neon-cyan outline-none font-mono w-full md:w-64"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button 
                    onClick={fetchInventory}
                    className="text-[10px] border border-gray-700 px-4 py-1 hover:border-neon-cyan text-gray-500 hover:text-neon-cyan transition-all font-bold"
                >
                    REFRESH_DATABASE
                </button>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center font-mono text-neon-cyan animate-pulse">
                    LOADING_ENCRYPTED_DATA...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-black/40 border border-gray-800 p-6 rounded-sm group hover:border-neon-cyan/50 transition-all backdrop-blur-sm relative overflow-hidden"
                        >
                            {/* Decorative Ba