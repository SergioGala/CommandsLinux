import React, { useState, useEffect } from 'react';
import { Search, Copy, CheckCircle, Star, Terminal, Code, FileText, Network, Settings, Database, Shield, Users } from 'lucide-react';

const BashCommandsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCommand, setCopiedCommand] = useState('');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: 'Todos', icon: Star, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'navigation', name: 'Navegación', icon: Terminal, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'files', name: 'Archivos', icon: FileText, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 'git', name: 'Git', icon: Code, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 'network', name: 'Red', icon: Network, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { id: 'system', name: 'Sistema', icon: Settings, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: 'database', name: 'Base de Datos', icon: Database, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { id: 'security', name: 'Seguridad', icon: Shield, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'users', name: 'Usuarios', icon: Users, gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' }
  ];

  const commands = [
    // Navegación
    { 
      command: 'pwd', 
      description: 'Muestra el directorio actual de trabajo', 
      example: 'pwd', 
      category: 'navigation',
      level: 'básico'
    },
    { 
      command: 'ls -la', 
      description: 'Lista archivos y carpetas con detalles', 
      example: 'ls -la', 
      category: 'navigation',
      level: 'básico'
    },
    { 
      command: 'cd /workspaces', 
      description: 'Cambiar al directorio workspaces', 
      example: 'cd /workspaces/mi-proyecto', 
      category: 'navigation',
      level: 'básico'
    },
    { 
      command: 'find . -name "*.js"', 
      description: 'Buscar archivos JavaScript', 
      example: 'find . -name "*.json"', 
      category: 'navigation',
      level: 'intermedio'
    },
    { 
      command: 'tree -L 2', 
      description: 'Mostrar estructura en árbol', 
      example: 'tree -L 3', 
      category: 'navigation',
      level: 'intermedio'
    },
    
    // Archivos
    { 
      command: 'touch archivo.txt', 
      description: 'Crear un archivo vacío', 
      example: 'touch index.html', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'mkdir -p carpeta/subcarpeta', 
      description: 'Crear directorios anidados', 
      example: 'mkdir -p src/components', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'cp -r origen destino', 
      description: 'Copiar archivos o carpetas', 
      example: 'cp -r src/ backup/', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'mv archivo.txt nuevo.txt', 
      description: 'Mover o renombrar archivos', 
      example: 'mv temp.js index.js', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'rm -rf carpeta/', 
      description: 'Eliminar archivos o carpetas', 
      example: 'rm -rf node_modules/', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'cat archivo.txt', 
      description: 'Mostrar contenido de archivo', 
      example: 'cat package.json', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'nano archivo.txt', 
      description: 'Editar archivo con nano', 
      example: 'nano README.md', 
      category: 'files',
      level: 'básico'
    },
    { 
      command: 'head -n 10 archivo.txt', 
      description: 'Mostrar primeras 10 líneas', 
      example: 'head -n 5 log.txt', 
      category: 'files',
      level: 'intermedio'
    },
    { 
      command: 'tail -f log.txt', 
      description: 'Seguir archivo en tiempo real', 
      example: 'tail -f server.log', 
      category: 'files',
      level: 'intermedio'
    },
    { 
      command: 'grep "error" archivo.txt', 
      description: 'Buscar texto en archivos', 
      example: 'grep -i "function" *.js', 
      category: 'files',
      level: 'intermedio'
    },
    
    // Git
    { 
      command: 'git status', 
      description: 'Ver estado del repositorio', 
      example: 'git status', 
      category: 'git',
      level: 'básico'
    },
    { 
      command: 'git add .', 
      description: 'Agregar todos los cambios', 
      example: 'git add src/', 
      category: 'git',
      level: 'básico'
    },
    { 
      command: 'git commit -m "mensaje"', 
      description: 'Confirmar cambios', 
      example: 'git commit -m "feat: add login"', 
      category: 'git',
      level: 'básico'
    },
    { 
      command: 'git push origin main', 
      description: 'Subir cambios al repositorio', 
      example: 'git push origin develop', 
      category: 'git',
      level: 'básico'
    },
    { 
      command: 'git pull origin main', 
      description: 'Descargar cambios del repositorio', 
      example: 'git pull origin main', 
      category: 'git',
      level: 'básico'
    },
    { 
      command: 'git branch', 
      description: 'Listar ramas', 
      example: 'git branch -a', 
      category: 'git',
      level: 'básico'
    },
    { 
      command: 'git checkout -b nueva-rama', 
      description: 'Crear y cambiar a nueva rama', 
      example: 'git checkout -b feature/login', 
      category: 'git',
      level: 'intermedio'
    },
    { 
      command: 'git merge rama', 
      description: 'Fusionar ramas', 
      example: 'git merge feature/login', 
      category: 'git',
      level: 'intermedio'
    },
    { 
      command: 'git log --oneline', 
      description: 'Ver historial de commits', 
      example: 'git log --oneline -5', 
      category: 'git',
      level: 'intermedio'
    },
    { 
      command: 'git stash', 
      description: 'Guardar cambios temporalmente', 
      example: 'git stash pop', 
      category: 'git',
      level: 'intermedio'
    },
    
    // Red
    { 
      command: 'curl -O https://url/archivo', 
      description: 'Descargar archivo desde URL', 
      example: 'curl -O https://example.com/file.zip', 
      category: 'network',
      level: 'intermedio'
    },
    { 
      command: 'wget https://url/archivo', 
      description: 'Descargar archivo con wget', 
      example: 'wget https://example.com/script.sh', 
      category: 'network',
      level: 'intermedio'
    },
    { 
      command: 'ping google.com', 
      description: 'Probar conectividad', 
      example: 'ping -c 4 github.com', 
      category: 'network',
      level: 'básico'
    },
    { 
      command: 'netstat -tulpn', 
      description: 'Mostrar conexiones de red', 
      example: 'netstat -tulpn | grep :3000', 
      category: 'network',
      level: 'avanzado'
    },
    { 
      command: 'ssh usuario@servidor', 
      description: 'Conectar por SSH', 
      example: 'ssh root@192.168.1.100', 
      category: 'network',
      level: 'intermedio'
    },
    
    // Sistema
    { 
      command: 'ps aux', 
      description: 'Listar procesos en ejecución', 
      example: 'ps aux | grep node', 
      category: 'system',
      level: 'intermedio'
    },
    { 
      command: 'kill -9 PID', 
      description: 'Terminar proceso por ID', 
      example: 'kill -9 1234', 
      category: 'system',
      level: 'intermedio'
    },
    { 
      command: 'top', 
      description: 'Monitor de procesos en tiempo real', 
      example: 'htop', 
      category: 'system',
      level: 'intermedio'
    },
    { 
      command: 'df -h', 
      description: 'Espacio en disco', 
      example: 'df -h', 
      category: 'system',
      level: 'básico'
    },
    { 
      command: 'free -h', 
      description: 'Memoria RAM disponible', 
      example: 'free -h', 
      category: 'system',
      level: 'básico'
    },
    { 
      command: 'uname -a', 
      description: 'Información del sistema', 
      example: 'uname -r', 
      category: 'system',
      level: 'básico'
    },
    { 
      command: 'history', 
      description: 'Historial de comandos', 
      example: 'history | grep git', 
      category: 'system',
      level: 'básico'
    },
    { 
      command: 'which comando', 
      description: 'Ubicación de un comando', 
      example: 'which python3', 
      category: 'system',
      level: 'básico'
    },
    
    // Base de Datos
    { 
      command: 'mysql -u root -p', 
      description: 'Conectar a MySQL', 
      example: 'mysql -u admin -p mydatabase', 
      category: 'database',
      level: 'intermedio'
    },
    { 
      command: 'mysqldump -u root -p db > backup.sql', 
      description: 'Hacer backup de base de datos', 
      example: 'mysqldump -u root -p mydb > backup.sql', 
      category: 'database',
      level: 'avanzado'
    },
    { 
      command: 'psql -U postgres -d database', 
      description: 'Conectar a PostgreSQL', 
      example: 'psql -U admin -d myapp', 
      category: 'database',
      level: 'intermedio'
    },
    
    // Seguridad
    { 
      command: 'chmod 755 script.sh', 
      description: 'Cambiar permisos de archivo', 
      example: 'chmod +x script.sh', 
      category: 'security',
      level: 'intermedio'
    },
    { 
      command: 'chown usuario:grupo archivo', 
      description: 'Cambiar propietario', 
      example: 'chown www-data:www-data /var/www', 
      category: 'security',
      level: 'intermedio'
    },
    { 
      command: 'sudo comando', 
      description: 'Ejecutar como administrador', 
      example: 'sudo apt update', 
      category: 'security',
      level: 'básico'
    },
    
    // Usuarios
    { 
      command: 'whoami', 
      description: 'Mostrar usuario actual', 
      example: 'whoami', 
      category: 'users',
      level: 'básico'
    },
    { 
      command: 'id usuario', 
      description: 'Información del usuario', 
      example: 'id root', 
      category: 'users',
      level: 'básico'
    },
    { 
      command: 'su usuario', 
      description: 'Cambiar a otro usuario', 
      example: 'su - postgres', 
      category: 'users',
      level: 'intermedio'
    }
  ];

  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (command) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const toggleFavorite = (command) => {
    if (favorites.includes(command)) {
      setFavorites(favorites.filter(fav => fav !== command));
    } else {
      setFavorites([...favorites, command]);
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'básico': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'intermedio': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'avanzado': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      default: return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.9) 100%),
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)
      `,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Partículas animadas de fondo */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.6)`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            zIndex: 1
          }}
        />
      ))}
      
      {/* Header espectacular */}
      <header style={{
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%),
          linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)
        `,
        backdropFilter: 'blur(20px)',
        padding: '60px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `
            linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent),
            linear-gradient(0deg, transparent, rgba(219, 39, 119, 0.1), transparent)
          `,
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            textAlign: 'center',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
            letterSpacing: '-0.02em'
          }}>
            Bash Commands Hub
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            fontSize: '1.5rem',
            margin: '0 0 40px 0',
            fontWeight: '300',
            letterSpacing: '0.01em'
          }}>
            Master the terminal with style and efficiency
          </p>
          
          {/* Terminal badge */}
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              padding: '12px 30px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdrop: 'blur(10px)'
            }}>
              <Terminal size={20} color="#10b981" />
              <span style={{
                color: '#10b981',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                Codespaces Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Controles modernos */}
        <div style={{
          display: 'flex',
          gap: '30px',
          marginBottom: '60px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          
          {/* Buscador premium */}
          <div style={{
            position: 'relative',
            flex: '1',
            minWidth: '350px'
          }}>
            <div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
              borderRadius: '25px',
              padding: '3px',
              backgroundImage: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              backgroundClip: 'padding-box',
              border: 'transparent'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                borderRadius: '22px',
                position: 'relative'
              }}>
                <Search 
                  size={24} 
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#8b5cf6',
                    zIndex: 2
                  }}
                />
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 20px 18px 60px',
                    border: 'none',
                    borderRadius: '22px',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '1.1rem',
                    outline: 'none',
                    fontWeight: '400'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Filtros elegantes */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: '20px',
                    background: selectedCategory === category.id ? 
                      category.gradient : 
                      'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    fontWeight: selectedCategory === category.id ? '600' : '500',
                    boxShadow: selectedCategory === category.id ? 
                      '0 8px 25px rgba(0, 0, 0, 0.2)' : 
                      'none',
                    transform: selectedCategory === category.id ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                  onMouseOver={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <IconComponent size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notificación premium */}
        {copiedCommand && (
          <div style={{
            position: 'fixed',
            top: '30px',
            right: '30px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '16px 25px',
            borderRadius: '15px',
            fontWeight: '600',
            zIndex: 1000,
            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideIn 0.4s ease, fadeOut 0.4s ease 1.6s forwards',
            backdropFilter: 'blur(10px)'
          }}>
            <CheckCircle size={20} />
            Command copied successfully!
          </div>
        )}

        {/* Grid de comandos espectacular */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
          gap: '30px'
        }}>
          {filteredCommands.map((cmd, index) => (
            <div
              key={index}
              style={{
                background: `
                  linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%),
                  linear-gradient(45deg, rgba(139, 92, 246, 0.05) 0%, rgba(219, 39, 119, 0.05) 100%)
                `,
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              
              {/* Decoración superior */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #10b981)',
                borderRadius: '20px 20px 0 0'
              }} />

              {/* Header del comando */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontFamily: 'JetBrains Mono, Consolas, monospace',
                  fontSize: '1rem',
                  color: '#10b981',
                  fontWeight: '600',
                  flex: 1,
                  marginRight: '15px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  $ {cmd.command}
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => toggleFavorite(cmd.command)}
                    style={{
                      background: favorites.includes(cmd.command) ? 
                        'linear-gradient(135deg, #fbbf24, #f59e0b)' : 
                        'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Star 
                      size={18} 
                      color={favorites.includes(cmd.command) ? '#fff' : '#94a3b8'}
                      fill={favorites.includes(cmd.command) ? '#fff' : 'none'}
                    />
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(cmd.command)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <Copy size={18} color="#94a3b8" />
                  </button>
                </div>
              </div>

              {/* Descripción elegante */}
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontWeight: '400'
              }}>
                {cmd.description}
              </p>

              {/* Ejemplo con estilo */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))',
                padding: '16px 20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <span style={{
                  color: '#8b5cf6',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Example
                </span>
                <br />
                <code style={{
                  color: '#fbbf24',
                  fontFamily: 'JetBrains Mono, Consolas, monospace',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  marginTop: '8px',
                  display: 'block'
                }}>
                  {cmd.example}
                </code>
              </div>

              {/* Tags modernos */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  background: getLevelColor(cmd.level),
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}>
                  {cmd.level}
                </span>
                
                <span style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)'
                }}>
                  {categories.find(cat => cat.id === cmd.category)?.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCommands.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px',
              opacity: '0.3'
            }}>
              🔍
            </div>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '15px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600'
            }}>
              No commands found
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              Try different search terms or change the category filter
            </p>
          </div>
        )}
      </div>

      {/* Footer espectacular */}
      <footer style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
        padding: '50px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.2rem',
            margin: '0 0 15px 0',
            fontWeight: '600'
          }}>
            🚀 Created for Developer Bootcamp
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1rem',
            margin: '0',
            fontWeight: '400'
          }}>
            Master the terminal and accelerate your productivity
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) transparent;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default BashCommandsApp;