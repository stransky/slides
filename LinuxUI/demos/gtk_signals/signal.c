// build by gcc -o test2 -g -O0 test2.c `pkg-config --libs --cflags gtk+-3.0`

#include <gtk/gtk.h>
#include <gdk/gdkkeysyms.h>

GtkWidget *window;
GtkWidget *drawing;

static void draw_tooltip_cb(GtkWidget *widget, cairo_t* cr,
                            gpointer   data )
{
    cairo_rectangle (cr, 0, 0, 100, 100);
    cairo_set_source_rgb (cr, 1, 0, 0);
    cairo_fill (cr);

    cairo_t* cr3 = gdk_cairo_create(gtk_widget_get_window(widget));
    cairo_rectangle (cr3, 0, 0, 70, 70);
    cairo_set_source_rgb (cr3, 0, 0, 1);
    cairo_fill (cr3);
}

gboolean
on_key_press (GtkWidget *widget, GdkEventKey *event, gpointer user_data)
{
  printf("key pressed \n");
  return FALSE;
}

/* Another callback */
static void destroy( GtkWidget *widget,
                     gpointer   data )
{
    gtk_main_quit ();
}

int main( int   argc,
          char *argv[] )
{
    gtk_init (&argc, &argv);

    /* create a new window */
    window = gtk_window_new (GTK_WINDOW_TOPLEVEL);
    drawing = gtk_drawing_area_new();
    gtk_container_add(GTK_CONTAINER(window), drawing);

    g_signal_connect (window, "destroy",
          G_CALLBACK (destroy), NULL);

    g_signal_connect (drawing, "draw",
          G_CALLBACK (draw_tooltip_cb), NULL);

    g_signal_connect (window, "key_press_event",
          G_CALLBACK (on_key_press), NULL);

    gtk_widget_show_all (GTK_WIDGET(window));

    gtk_main ();

    return 0;
}
