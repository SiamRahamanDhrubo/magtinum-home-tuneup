
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MPKGame {
  id: string;
  name: string;
  description?: string;
  download_url: string;
  file_size?: number;
  version?: string;
  thumbnail_url?: string;
}

export interface UserGame {
  id: string;
  user_id: string;
  game_name: string;
  game_type: 'external' | 'mpk';
  file_path?: string;
  install_path?: string;
  thumbnail_url?: string;
  is_installed: boolean;
  created_at: string;
}

export const useGameLibrary = () => {
  const [mpkGames, setMpkGames] = useState<MPKGame[]>([]);
  const [userGames, setUserGames] = useState<UserGame[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMPKGames = async () => {
    try {
      const { data, error } = await supabase
        .from('mpk_games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMpkGames(data || []);
    } catch (error) {
      console.error('Error fetching MPK games:', error);
      toast({
        title: "Error",
        description: "Failed to fetch MPK games",
        variant: "destructive",
      });
    }
  };

  const fetchUserGames = async () => {
    try {
      const { data, error } = await supabase
        .from('user_games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion to ensure game_type matches our union type
      const typedUserGames = (data || []).map(game => ({
        ...game,
        game_type: game.game_type as 'external' | 'mpk'
      }));
      
      setUserGames(typedUserGames);
    } catch (error) {
      console.error('Error fetching user games:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user games",
        variant: "destructive",
      });
    }
  };

  const addUserGame = async (gameData: Omit<UserGame, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_games')
        .insert([{ ...gameData, user_id: user.id }]);

      if (error) throw error;
      
      await fetchUserGames();
      toast({
        title: "Success",
        description: "Game added to library",
      });
    } catch (error) {
      console.error('Error adding game:', error);
      toast({
        title: "Error",
        description: "Failed to add game to library",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMPKGames(), fetchUserGames()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    mpkGames,
    userGames,
    loading,
    addUserGame,
    refreshUserGames: fetchUserGames,
    refreshMPKGames: fetchMPKGames,
  };
};
