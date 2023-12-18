export type DrawingCanvasProps = {
  preview: string
  id: string
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      drawing_prompts: {
        Row: {
          id: number
          prompt: string | null
        }
        Insert: {
          id: number
          prompt?: string | null
        }
        Update: {
          id?: number
          prompt?: string | null
        }
        Relationships: []
      }
      drawings: {
        Row: {
          created_at: string
          created_by: string | null
          guessed_by: string | null
          id: string
          preview_data: string | null
          privacy: string | null
          prompt: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          guessed_by?: string | null
          id?: string
          preview_data?: string | null
          privacy?: string | null
          prompt?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          guessed_by?: string | null
          id?: string
          preview_data?: string | null
          privacy?: string | null
          prompt?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'drawings_guessed_by_fkey'
            columns: ['guessed_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      guess: {
        Row: {
          created_at: string
          drawing_id: string | null
          guess_remaining: number | null
          id: string
          solved: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          drawing_id?: string | null
          guess_remaining?: number | null
          id?: string
          solved?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          drawing_id?: string | null
          guess_remaining?: number | null
          id?: string
          solved?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'guess_drawing_id_fkey'
            columns: ['drawing_id']
            isOneToOne: false
            referencedRelation: 'drawings'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'guess_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      points: {
        Row: {
          id: string
          sum_points: number | null
          user_id: string | null
        }
        Insert: {
          id?: string
          sum_points?: number | null
          user_id?: string | null
        }
        Update: {
          id?: string
          sum_points?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'points_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          email: string
          full_name: string | null
          id: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          full_name?: string | null
          id: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          full_name?: string | null
          id?: string
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      guess: {
        Args: {
          drawing_id: string
          user_id: string
        }
        Returns: undefined
      }
      increment_points: {
        Args: {
          earned_points: number
          row_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
