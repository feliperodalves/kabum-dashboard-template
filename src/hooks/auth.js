import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const AuthProvider = ({ children }) => {
  const [user] = useState(() => {
    const name = 'Felipe Alves';

    const updates = randomNumber(0, 20);
    const messages = randomNumber(0, 20);
    const tasks = randomNumber(0, 20);
    const comments = randomNumber(0, 20);
    const payments = randomNumber(0, 20);
    const projects = randomNumber(0, 20);

    return {
      name,
      avatar: `https://api.adorable.io/avatars/285/${name}.png`,
      updates,
      messages,
      tasks,
      comments,
      payments,
      projects,
    };
  });

  const [notifications] = useState(() => {
    const userNotifications = [
      {
        icon: 'cil-user-follow',
        text: 'Novo usuário Cadastrado',
        class: 'success',
      },
      {
        icon: 'cil-user-unfollow',
        text: 'Usuário deletado',
        class: 'danger',
      },
      {
        icon: 'cil-chart-pie',
        text: 'Relatório de Vendas pronto',
        class: 'info',
      },
      {
        icon: 'cil-basket',
        text: 'Novo cliente Cadastrado',
        class: 'primary',
      },
      {
        icon: 'cil-speedometer',
        text: 'Servidor Sobrecarregado',
        class: 'warning',
      },
    ];

    return userNotifications;
  });

  return (
    <AuthContext.Provider value={{ user, notifications }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
